var b=document.querySelector('.burger');
var n=document.querySelector('.top nav');
b.addEventListener('click',function(){
  var o=n.classList.toggle('open');
  b.setAttribute('aria-expanded',o);
});
