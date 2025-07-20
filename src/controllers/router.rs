#![allow(clippy::missing_errors_doc)]
#![allow(clippy::unnecessary_struct_initialization)]
#![allow(clippy::unused_async)]
use loco_rs::prelude::*;
use serde::{Deserialize, Serialize};
use axum::debug_handler;

use crate::models::{_entities::routers::{self, ActiveModel, Entity, Model}, routers::RoutersParams};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Params {
    pub link: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ReplyRouter {
    link: String,
    hash: String,
}

#[debug_handler]
pub async fn add(State(ctx): State<AppContext>, Json(params): Json<RoutersParams>) -> Result<Response> {
    let res = routers::Model::save_link(&ctx.db, &params).await;
    match res {
        Ok(item) => {
            let reply = ReplyRouter {
                link: item.link.clone(),
                hash: item.hash.clone(),
            };
            format::json(reply)
        },
        Err(_) => {
            format::json({})
        }
    }    
}

#[debug_handler]
pub async fn get_hash(Path(hash): Path<String>, State(ctx): State<AppContext>) -> Result<Response> {    
    let item = routers::Model::find_by_hash(&ctx.db, &hash).await?;
    format::json(item)
}

pub fn routes() -> Routes {
    Routes::new()
        .prefix("api/routers/")
        .add("/{hash}", get(get_hash))
        .add("/", post(add))
        
}
