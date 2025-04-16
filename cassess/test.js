class A {
  msg = 'Hello, World!';

  constructor() {
    this.msg = this.getMsg();
    this.greet();
  }

  getMsg() {
    // return this.msg;
  }

  greet() {
    console.log(this.msg);
  }
}

class B extends A {
  msg = 'Good morning!';

  getMsg() {
    return 'foo';
  }
}

new B();
