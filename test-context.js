var context = require.context('./app/scripts', true, /-spec\.js$/);
context.keys().forEach(context);