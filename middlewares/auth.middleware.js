export function ensureAuthenticated(req, res, next) {

    if (req.session && req.session.userId) {
        return next();
    }

    if (req.session && !req.session.userId) {
        req.flash('error_msg', 'Your session has expired. Please log in again.');
        console.log('Your session has expired. Please log in again.');
    }
    
    res.redirect('/');
}
