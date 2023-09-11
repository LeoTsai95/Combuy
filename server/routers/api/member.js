const express = require('express')

var router = express.Router()

const MemberController = require('../../controllers/memberPage/memberController')

// 會員資料更新
router.post('/dataUpdate', MemberController.dataUpdateAPI)
// 密碼更新
router.put('/pwdChange', MemberController.pwdChangeAPI)
// 卡片資料
router.post('/addCard', MemberController.addCradAPI)
router.put('/editCard', MemberController.editCardAPI)
router.delete('/deleteCard', MemberController.deleteCardAPI)
// 收藏、取消收藏
router.post('/collectProd', MemberController.collectProdAPI)
// 評論
router.patch('/commentUpdate', MemberController.commentUpdateAPI)

module.exports = router
