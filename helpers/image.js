const axios = require('axios')

class ImageHelper {
  static uploadImage(files, product) {
    const requests = []
    for (const f of files) {
      const file = f.buffer.toString('base64')
      const request = axios({
          method: 'POST',
          headers: {
            Authorization :'Client-ID '+process.env.IMGUR_CLIENT_ID,
            'Content-Type': 'application/json',
          },
          url: process.env.IMGURL_API_URL,
          data: {
            image: file,
            title: `${product.id}-${f.originalname}`
          }
        })
      requests.push(request)
    }
    return axios.all(requests)
  }

  static deleteImagesInImgur (images) {
    const requests = []
    for (const image of images) {
      const request = axios({
        method: 'DELETE',
        headers: {
          Authorization :'Client-ID '+process.env.IMGUR_CLIENT_ID,
          'Content-Type': 'application/json',
        },
        url: `${process.env.IMGURL_API_URL}/${image.delete_hash}`,
      })
      requests.push(request)
    }
    return axios.all(requests)
  }
}

module.exports = ImageHelper