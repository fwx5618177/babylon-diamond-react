attribute vec2 position;// 顶点位置属性
uniform vec2 scale;// 用于缩放的 uniform 变量

varying vec2 vUV;// 用于传递到片段着色器的纹理坐标
const vec2 madd=vec2(.5,.5);// 常量，用于平移纹理坐标

void main(void){
  // 计算纹理坐标，先将位置坐标进行缩放和平移
  vUV=(position*madd+madd)*scale;
  
  // 设置最终的顶点位置，z 轴和 w 轴设置为 0 和 1
  gl_Position=vec4(position,0.,1.);
}