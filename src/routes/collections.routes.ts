// collectionsRouter.ts
import { Router } from 'express';
import { Container } from 'typedi';
import { CollectionsController } from '../controllers/collection.controller';
// Adjust the import path

export const collectionsRouter = Router();
const collectionController = Container.get(CollectionsController);

collectionsRouter.get("/", collectionController.getAll);
collectionsRouter.get("/:id", collectionController.getCollectionById);
collectionsRouter.delete("/delete/:id", collectionController.deleteCollection);
collectionsRouter.patch("/update/:id", collectionController.updateCollection);
collectionsRouter.get("/by-class/:classId", collectionController.getCollectionByClass);  // Changed route to avoid conflict with getCollectionById
collectionsRouter.post("/", collectionController.create);

export default collectionsRouter;
