var helper = new Object();

const navAdmin =  '<li class="nav-item"><a class="nav-link" href="/admin">Admin</a></li>';

helper.adminNavigation = (user, options) => {

    console.log(user);
    if (user && user.isAdmin && (user.isAdmin=='true')) {
        return navAdmin;
    }
    else {
        return;
    }
    

}

module.exports = helper;