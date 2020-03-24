module.exports = () => {
  const fs = require('fs')
  const keyfile = {
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_URL,
    client_x509_cert_url: process.env.CLIENT_CERT_URL
  }
  const content = JSON.stringify(keyfile)
  console.log(content)
  fs.writeFileSync('keyfile.json', content, 'utf8')
}
