const uploaderInfo = require('../../db/models/uploaderInfo');
const express = require("express");
const db = require('../../db/dbconfig');
const router = express.Router();
const VoteCount = require("../../db/models/voteCount");
const UploaderInfo = require("../../db/models/uploaderInfo");
const VoteLog = require("../../db/models/voteLog");

router.get("/", async (req, res) => {
    try {
        const ip = req.ip;
        const logRec = await VoteLog.findOne({
            where: {
                ip
            }
        });
        let allVideos = await VoteCount.scope('public').findAll();
        allVideos = allVideos.map(v => ({
            ...v.toJSON(),
            isVoted: !!logRec,
            votedId: logRec ? logRec.videoId : null,
            uploader: {
                id: v.uploader.id,
                uploaderDOBEnglish: v.uploader.uploaderDOBEnglish,
                uploaderDOBHebrew: v.uploader.uploaderDOBHebrew.split('-').slice(0, 2).join(' '),
                uploaderFirstName: v.uploader.uploaderFirstName,
                uploaderLastName: v.uploader.uploaderLastName
            }
        }))
        res.send(allVideos);
    } catch (error) {
        console.error(error);
        res.send(error)
    }
});

router.post("/vote", async (req, res) => {

    const t = await db.transaction();
    try {
        const ip = req.ip;

        const logRec = await VoteLog.findOne({
            where: {
                ip
            }
        });

        if (logRec) {
            res.status(400);
            res.send({message: 'You can vote only once '});
            return;
        }

        const video = await VoteCount.findOne({
            where: {
                id: req.body.id,
            }
        });

        await VoteLog.create({
            ip,
            videoId: video.id,
            createdAt: new Date(),
        }, {transaction: t});

        await VoteCount.update({
            votes: video.votes + 1
        }, {
            where: {
                id: video.id
            }
        }, {transaction: t});

        await t.commit();

        res.status(201);
        res.send();
    } catch (error) {
        console.error(error);
        await t.rollback();
        res.send(error)
    }
});

module.exports = router;
