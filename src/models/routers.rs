use sea_orm::entity::prelude::*;
use loco_rs::{prelude::*};
pub use super::_entities::routers::{ActiveModel, Model, Entity};
use crate::models::_entities::routers;
pub type Routers = Entity;
use sha256::{digest};
use serde::{Deserialize, Serialize};
use loco_rs::testing::redaction::{get_cleanup_date, get_cleanup_model};

#[derive(Debug, Deserialize, Serialize)]
pub struct RoutersParams {
    pub link: String,
}


fn generate_hash_link(link: String) -> String {
    let hash = digest(link.to_string()).to_string();
    let new_hash = &hash[0..7];
    return new_hash.to_string()
}

#[async_trait::async_trait]
impl ActiveModelBehavior for ActiveModel {
    async fn before_save<C>(self, _db: &C, insert: bool) -> std::result::Result<Self, DbErr>
    where
        C: ConnectionTrait,
    {
        if !insert && self.updated_at.is_unchanged() {
            let mut this = self;
            this.updated_at = sea_orm::ActiveValue::Set(chrono::Utc::now().into());
            Ok(this)
        } else {
            Ok(self)
        }
    }
}

// implement your read-oriented logic here
impl Model {
    
    /// Asynchronously creates link with hash
    /// database.
    ///
    /// # Errors
    ///
    /// When could not save the link into the DB
    pub async fn save_link(
        db: &DatabaseConnection,
        params: &RoutersParams,
    ) -> ModelResult<Self> {
        let txn = db.begin().await?;
        let hash = generate_hash_link(params.link.to_string());
        
        let router = routers::ActiveModel {
            link: ActiveValue::set(params.link.to_string()),
            hash: ActiveValue::set(hash),
            ..Default::default()
        }
        .insert(&txn)
        .await?;

        txn.commit().await?;

        Ok(router)
    }

    /// Asynchronously get link by hash
    /// database.
    ///
    /// # Errors
    ///
    /// When could not find the link and hash into the DB
    pub async fn find_by_hash(db: &DatabaseConnection, hash: &str) -> ModelResult<Self> {
        let router = routers::Entity::find()
            .filter(
                model::query::condition()
                    .eq(routers::Column::Hash, hash)
                    .build(),
            )
            .one(db)
            .await?;
        router.ok_or_else(|| ModelError::EntityNotFound)
    }
}

// implement your write-oriented logic here
impl ActiveModel {}

// implement your custom finders, selectors oriented logic here
impl Entity {}

#[must_use]
pub fn cleanup_routers_model() -> Vec<(&'static str, &'static str)> {
    let mut combined_filters = get_cleanup_date().clone();    
    combined_filters.extend(get_cleanup_model().iter().copied());
    combined_filters
}