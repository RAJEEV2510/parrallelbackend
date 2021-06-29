const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('admin-bro-mongoose')

const mongoose=require('mongoose')

AdminBro.registerAdapter(AdminBroMongoose)

const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
})
const Admin={
    email:"rajeevupadhyay@gmail.com",
    password:"newadmin"
}

const router=AdminBroExpress.buildAuthenticatedRouter(adminBro,{
    cookieName:"parallel",
    cookiePassword:"newadmin",
    authenticate:async (email,password)=>{

        if(email==Admin.email && password==Admin.password)
            {
                return Admin;
            }
            else
            return null;
    }

});
module.exports=router