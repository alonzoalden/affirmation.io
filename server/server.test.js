var expect = require('chai').expect;
var request = require('request');
var axios = require('axios');

//Create more versatile tests check other crud operations.
//GET POST PUT DELETE

describe('Bobby.com user account should be deleted to be added later', function() {

  it('Should delete user bobby.com', function(done) {
    axios({
      method: 'delete',
      url: 'http://localhost:8000/api/users/bobby.com',
    })
    .then((user) => {
      expect(user).to.exist;
      done();
    })
    .catch((error) => {
      console.log(error);
    })
  })

})

describe('Should persist users to the database', function() {

  it('Should post a new user to the database', function(done) {
    return axios.post('http://localhost:8000/api/users', {
        'email': 'bobby.com',
        'avatar': 'Phillip',
        'name': 'Phillip',
        'job': 'hacker',
        'location': 'space',
        'about': 'asdf'
    })
    .then((user) => {
      expect(user.data.email).to.equal('bobby.com');
      done();
    })
    .catch((error) => {
      console.log('Error user not added to DB: ', error)
    })
  })

});

describe('Should get the persisted user from the database', function() {

  it('Should get bobby.com from the database', function(done) {
    return axios.get('http://localhost:8000/api/users/bobby.com')
      .then((user) => {
        console.log('Should be bobby: ', user.data.user.email)
        var name = user.data.user.email
        expect(name).to.equal('bobby.com');
        done();
      })
      .catch((error) => {
        console.log('Did not get user:', error)
      })
  })
})

describe('Should post data to be persisted on the database', function() {
  it('Should send a post to the database', function(done) {
    return axios.post('http://localhost:8000/api/posts/wanttolearn', {
      title: 'blah blah just a test',
      message: 'only a test.',
      anon: false,
      userEmail: 'bobby.com',
    })
    .then((user) => {
      var success = user.data;
      expect(success).to.equal('Your post has been submitted!');
      done();
    })
    .catch((error) => {
      console.log('Error user not added to DB: ', error)
    })
  })
})


describe('Should delete once again to clear the database', function() {
  it('Should delete user bobby.com', function(done) {
    axios({
      method: 'delete',
      url: 'http://localhost:8000/api/users/bobby.com',
    })
    .then((user) => {
      expect(user.data).to.equal('')
      done();
    })
    .catch((error) => {
      console.log(error);
    })
  })
})

