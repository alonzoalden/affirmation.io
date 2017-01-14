var expect = require('chai').expect;
var request = require('request');
var axios = require('axios');

describe('bobby.com user account should be deleted', function() {

  it('Should delete user bobby.com', function(done) {
    axios({
      method: 'delete',
      url: 'http://localhost:8000/api/users/bobby.com',
    })
    .then((user) => {
      console.log('ASDFASDFASDF LOOK HERE: ', user.data)
      expect(user.data).to.equal('')
      done();
    })
    .catch((error) => {
      console.log(error);
    })

  })
})

describe('Should persist and get users from the database', function() {

  it('Should post a new user to the database', function(done) {
    axios({
      method: 'post',
      data: {
        'email': 'bobby.com',
        'avatar': 'Phillip',
        'name': 'Phillip',
        'job': 'hacker',
        'location': 'space',
        'about': 'asdf',
      },
      url: 'http://localhost:8000/api/users',
    })
    .then((user) => {
      console.log('User added to DB: ');
      expect(user).to.exist;
      done();
    })
    .catch((error) => {
      console.log('Error user not added to DB: ', error)
    })
  })

  it('Should get a user from the database', function(done) {
    axios({
      method: 'get',
      data: {
        'title': 'the hello world',
        'message': 'asdfasdfasdf',
        'anon': false,
        'userEmail': 'bobby.com'
      },
      url: 'http://localhost:8000/api/users/bob.com',
    })
    .then((user) => {
      console.log('Should be bob: ')
      expect(user).to.exist;
      done()
    })
  })

});
