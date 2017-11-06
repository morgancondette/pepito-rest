import * as restify from "restify";
import * as restifyErrors from "restify-errors";

import PhotoModel from "./model";

const PhotoRoute = function(server: restify.Server) {
  const PHOTO_ROUTE_PATH = "/photo/";
  const PHOTO_ROUTE_PATH__WITH_ID = "/photo/:photo_id";
  /**
   * POST
   */
  server.post(PHOTO_ROUTE_PATH, (req, res, next) => {
    if (!req.is("application/json")) {
      return next(
        new restifyErrors.InvalidContentError("Expects 'application/json'"),
      );
    }

    const data = req.body || {};

    const photo = new PhotoModel(data);
    photo.save(function(err) {
      if (err) {
        console.error(err);
        return next(new restifyErrors.InternalError(err.message));
      }

      res.send(201);
      next();
    });
  });

  /**
   * LIST
   */
  server.get(PHOTO_ROUTE_PATH, (req, res, next) => {
    PhotoModel.find(req.params, function(err, docs) {
      if (err) {
        console.error(err);
        return next(
          new restifyErrors.InvalidContentError(err.errors.name.message),
        );
      }

      res.send(docs);
      next();
    });
  });

  /**
   * GET
   */
  server.get(PHOTO_ROUTE_PATH__WITH_ID, (req, res, next) => {
    PhotoModel.findOne({ _id: req.params.photo_id }, function(err, doc) {
      if (err) {
        console.error(err);
        return next(
          new restifyErrors.InvalidContentError(err.errors.name.message),
        );
      }

      res.send(doc);
      next();
    });
  });

  /**
   * UPDATE
   */
  server.put(PHOTO_ROUTE_PATH__WITH_ID, (req, res, next) => {
    if (!req.is("application/json")) {
      return next(
        new restifyErrors.InvalidContentError("Expects 'application/json'"),
      );
    }

    let data = req.body || {};

    if (!data._id) {
      data = Object.assign({}, data, { _id: req.params.todo_id });
    }

    PhotoModel.findOne({ _id: req.params.todo_id }, function(err, doc) {
      if (err) {
        console.error(err);
        return next(
          new restifyErrors.InvalidContentError(err.errors.name.message),
        );
      } else if (!doc) {
        return next(
          new restifyErrors.ResourceNotFoundError(
            "The resource you requested could not be found.",
          ),
        );
      }

      PhotoModel.update({ _id: data._id }, data, function(err) {
        if (err) {
          console.error(err);
          return next(
            new restifyErrors.InvalidContentError(err.errors.name.message),
          );
        }

        res.send(200, data);
        next();
      });
    });
  });

  /**
   * DELETE
   */
  server.del(PHOTO_ROUTE_PATH__WITH_ID, (req, res, next) => {
    PhotoModel.remove({ _id: req.params.todo_id }, function(err) {
      if (err) {
        console.error(err);
        return next(
          new restifyErrors.InvalidContentError(err.errors.name.message),
        );
      }

      res.send(204);
      next();
    });
  });
};

export default PhotoRoute;
