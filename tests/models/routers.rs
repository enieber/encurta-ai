use loco_rs::testing::prelude::*;
use encurta_ai::{
    app::App,
    models::routers::{cleanup_routers_model, Model, RoutersParams},
};
use insta::assert_debug_snapshot;
use insta::with_settings;
use serial_test::serial;

macro_rules! configure_insta {
    ($($expr:expr),*) => {
        let mut settings = insta::Settings::clone_current();
        settings.set_prepend_module_to_snapshot(false);
        settings.set_snapshot_suffix("routers");
        let _guard = settings.bind_to_scope();
    };
}


#[tokio::test]
#[serial]
async fn can_save_link() {
    configure_insta!();

    let boot = boot_test::<App>()
        .await
        .expect("Failed to boot test application");

    let params = RoutersParams {
        link: "https://mapeamento.softwarelivre.tec.br/".to_string(),
    };

    let res = Model::save_link(&boot.app_context.db, &params).await;

    
    with_settings!({
        filters => cleanup_routers_model()
    }, {
        assert_debug_snapshot!(res);
    });
}
