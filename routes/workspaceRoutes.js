const express = require('express');
const router = express.Router();
const workspaceController = require('../controllers/workspaceController');
const multer = require('multer');
const path = require('path');
const isAuthenticated = require('../authMiddleware');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ dest: 'public/images/' });

router.post('/workspaces', isAuthenticated, upload.array('images', 5), workspaceController.createWorkspace);
router.get('/workspaces', workspaceController.getAllWorkspaces);
router.get('/myworkspaces', workspaceController.getMyWorkspaces); 
router.delete('/workspaces/:id', isAuthenticated, workspaceController.deleteWorkspace);
router.put('/workspaces/:id', workspaceController.updateWorkspace);

module.exports = router;