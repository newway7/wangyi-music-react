// 设计稿以431px为宽度，而我把页面宽度设计为10rem的情况下

const baseSize = 43.1; // 这个是设计稿中1rem的大小。
function setRem() {
  // 实际设备页面宽度和设计稿的比值
  const scale = document.documentElement.clientWidth / 431;
  // 计算实际的rem值并赋予给html的font-size
  document.documentElement.style.fontSize = (baseSize * scale) + 'px';
}
setRem();
window.addEventListener('resize', () => {
  setRem();
});