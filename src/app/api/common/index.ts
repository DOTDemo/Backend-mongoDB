'use strict';

import * as express from 'express';
import * as controller from './common.controller';
import * as config from '../../config/environment';
import * as auth from '../../auth/auth.service';
import * as acl from "express-acl";

var router = express.Router();
router.use(acl.authorize);

router.get('/:collection', auth.isAuthenticated(), controller.get);
router.get('/:collection/:id', auth.isAuthenticated(), controller.getById);
router.get('/:collection/getbyuser/:user', auth.isAuthenticated(), controller.getByUser);
router.post('/:collection/:id', auth.isAuthenticated(), controller.update);
router.post('/:collection', auth.isAuthenticated(), controller.update);
router.put('/:collection', auth.isAuthenticated(), controller.createnew);
router.patch('/:collection/:id', controller.update);
router.delete('/:collection/:id', auth.isAuthenticated(), controller.destroy);
router.delete('/soft/:collection/:id', auth.isAuthenticated(), controller.softdestroy);
router.post('/execute/conditions/:collection', auth.isAuthenticated(), controller.executeQuery);
router.post('/execute/putpost/:collection', auth.isAuthenticated(), controller.putOrPost);
router.get('/metadata/plist/:collection', controller.metadata);
router.post('/create/multiples/:collection', auth.isAuthenticated(), controller.createFromArray);

export = router;