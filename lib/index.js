'use strict';

var getDuration = require('transition-duration');
var template = require('./template.html');

module.exports = LightBox;

function LightBox(el) {
  // if user call LightBox as a function,
  // we will create and return a LightBox instance.
  if (!(this instanceof LightBox)) {
    return new LightBox(el);
  }

  this.el = el || (el = document.createElement('div'));
  el.innerHTML = template;
  el.classList.add('lightbox');

  // find elements
  this.closeButton = el.querySelector('.lightbox-close-button');
  this.content = el.querySelector('.lightbox-content');
  this.body = el.querySelector('.lightbox-body');

  // event listeners
  var closeLightBox = (function (e) {
    e.preventDefault();
    e.stopPropagation();
    this.close();
  }).bind(this);

  var ignore = function (e) {
    e.preventDefault();
    e.stopPropagation();
  };

  this.el.addEventListener('click', closeLightBox);
  this.closeButton.addEventListener('click', closeLightBox);
  this.body.addEventListener('click', ignore);
}

LightBox.prototype.open = function (cb) {
  this.clearTimeout();
  this.el.classList.add('display');
  setTimeout(function () {
    this.el.classList.add('show');
    this.openTimer = cb && setTimeout(cb, getDuration(this.el));
  }.bind(this));
};

LightBox.prototype.close = function (cb) {
  this.clearTimeout();
  this.el.classList.remove('show');
  this.closeTimer = setTimeout(function () {
    this.el.classList.remove('display');
    cb && cb();
  }.bind(this), getDuration(this.el));
};

LightBox.prototype.clearTimeout = function () {
  clearTimeout(this.openTimer);
  clearTimeout(this.closeTimer);
};
