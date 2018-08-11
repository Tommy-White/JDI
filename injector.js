const injector = {
  dependencies: {},
  register: function (key, value) {
    this.dependencies[key] = value;
  },
  resolve: function (deps, func, scope) {
    var args = [];
    for (var i = 0; i < deps.length, d = deps[i]; i++) {
      if (this.dependencies[d]) {
        args.push(this.dependencies[d]);
      } else {
        throw new Error('Can\'t resolve ' + d);
      }
    }
    return function () {
      func.apply(scope || {}, args.concat(Array.prototype.slice.call(arguments, 0)));
    }
  }
}

var service = function() {
  console.log('--Service--');
}

injector.register('service', service)

var test = injector.resolve(['service'], function(s){
  s();
})
test();