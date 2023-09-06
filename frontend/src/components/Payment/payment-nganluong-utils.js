import CryptoJS from 'crypto-js'

//sanbox
export const API_CREATE_ORDER = 'https://sandbox.nganluong.vn/nl35/checkout.api.nganluong.post.php'
export const API_STATUS_ORDER = 'https://sandbox.nganluong.vn/nl35/service/order/check'
export const SITE_ID = '52075'
export const SITE_PASSWORD = '7730ccf84e5444bb4cf34cb168ec80a8'
export const VERSION = '3.1'
export const FUNCTION = 'SetExpressCheckout'
//production
// export const API_CREATE_ORDER = 'https://www.nganluong.vn/checkout.php'
// export const API_STATUS_ORDER = 'https://www.nganluong.vn/service/order/checkV2'
// export const SITE_ID = 'xxxx'
// export const SITE_PASSWORD = 'xxxxxxxxxxxxxxx'

const EMAIL_RECIEVER = 'itouchshow@gmail.com'
const RETURN_URL = '"http://localhost:3000/nlcallback"' //no need config this because we will check and receive order status on molibe
const NOTIFY_URL = '"http://localhost:3000/nlnotify"' //no need config this because we will check and receive order status on molibe

export function GetOrderRequestUrl(order_code, total_amount, payment_method, bank_code, buyer_fullname, buyer_email, buyer_mobile, total_item) {
    const affiliate_code = ''
    const order_description = '"BUY NFT Marketplace"'
    const secure_merchant_password = CryptoJS.MD5(SITE_PASSWORD)
    let orderUrl = API_CREATE_ORDER
        + '?merchant_id=' + SITE_ID
		+ '&merchant_password=' + secure_merchant_password
		+ '&version=' + VERSION
		+ '&function=' + FUNCTION
        + '&receiver_email=' + EMAIL_RECIEVER
		+ '&order_code=' + order_code
		+ '&total_amount=' + total_amount
		+ '&payment_method=' + payment_method
		+ '&bank_code=' + bank_code
		+ '&buyer_fullname=' + buyer_fullname
		+ '&buyer_email=' + buyer_email
		+ '&buyer_mobile=' + buyer_mobile
		+ '&return_url=' + RETURN_URL
		+ '&notify_url=' + NOTIFY_URL
		+ '&order_description=' + order_description
        + '&cur_code=VND'
        + '&total_item=' + total_item
        + '&tax_amount=' + 0
        + '&discount_amount=' + 0
        + '&fee_shipping=' + 0
        + '&affiliate_code=' + affiliate_code
        
    return orderUrl
}
