const express = require("express");
const router = express.Router();
const db = require('../../db/dbconfig');
const UploaderInfo = require("../../db/models/uploaderInfo");
const VoteCount = require("../../db/models/voteCount");
const passport = require("passport");

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403);
        res.json({
            message: 'Access denied'
        })
    }
}


router.get("/videos",
    passport.authenticate('jwt', {session: false}),
    isAdmin,
    async (req, res) => {
        try {
            let allVideos = await VoteCount.findAll({
                include: {
                    model: UploaderInfo,
                    as: 'uploader'
                },
                order: [
                    ['createdAt', 'DESC'],
                ]
            });
            res.json(allVideos.map(v => ({
                id: v.id,
                title: v.title,
                isActive: v.isActive,
                muxPlaybackId: v.muxPlaybackId,
                email: v.uploader.uploaderEmail,
                name: v.uploader.uploaderFirstName + ' ' + v.uploader.uploaderLastName ,
                uploadedAt: v.createdAt,
            })));
        } catch (error) {
            console.error(error);
            res.send(error)
        }
    });

router.delete("/videos/:id",
    passport.authenticate('jwt', {session: false}),
    isAdmin,
    async (req, res) => {
        try {
            let video = await VoteCount.findOne({
                where: {
                    id: req.params.id
                }
            });
            if (!video) {
                throw new Error('Video not found');
            }

            await VoteCount.destroy({
                where: {
                    id: video.id
                }
            });
            res.status(200);
        } catch (error) {
            console.log(error);
            res.status(400);
        }
        res.send();
    })
/**
 * @description Disable or enable video
 */
router.put("/videos/:id",
    passport.authenticate('jwt', {session: false}),
    isAdmin, async (req, res) => {
        const isActive = !!req.body.isActive;
        try {
            let video = await VoteCount.findOne({
                where: {
                    id: req.params.id
                }
            });
            if (!video) {
                throw new Error('Video not found');
            }

            await VoteCount.update({
                isActive: isActive
            }, {
                where: {
                    id: video.id
                }
            });
            res.status(200);
        } catch (error) {
            console.log(error);
            res.status(400);
        }
        res.send();
    })

module.exports = router;
