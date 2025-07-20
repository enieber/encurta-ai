use encurta_ai::{app::App, models::{_entities::routers, routers::{cleanup_routers_model, Model, RoutersParams}}};
use loco_rs::testing::prelude::*;

use serial_test::serial;
use insta::with_settings;
use insta::assert_debug_snapshot;

// TODO: see how to dedup / extract this to app-local test utils
// not to framework, because that would require a runtime dep on insta
macro_rules! configure_insta {
    ($($expr:expr),*) => {
        let mut settings = insta::Settings::clone_current();
        settings.set_prepend_module_to_snapshot(false);
        settings.set_snapshot_suffix("router_request");
        let _guard = settings.bind_to_scope();
    };
}

#[tokio::test]
#[serial]
async fn can_get_router_by_hash() {
    request::<App, _, _>(|request, _ctx| async move {
        let params = RoutersParams {
            link: "https://mapeamento.softwarelivre.tec.br/".to_string(),
        };

        let _res = Model::save_link(&_ctx.db, &params).await;
        let res = request.get("/api/routers/6746943").await;
        assert_eq!(res.status_code(), 200);
    })
    .await;
}

#[tokio::test]
#[serial]
async fn can_save_link() {
    configure_insta!();

    request::<App, _, _>(|request, ctx| async move {
        let hash = "6746943";
        let payload = serde_json::json!({
            "link": "https://mapeamento.softwarelivre.tec.br/"
        });
        let response = request.post("/api/routers").json(&payload).await;
        assert_eq!(
            response.status_code(),
            200,
        );
        
        let saved_routers = routers::Model::find_by_hash(&ctx.db, hash).await;


        with_settings!({
            filters => cleanup_routers_model()
        }, {
            assert_debug_snapshot!(saved_routers);
        });
        
    })
    .await;
}