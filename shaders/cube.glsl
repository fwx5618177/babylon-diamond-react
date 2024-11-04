#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;// 画布分辨率
uniform float u_time;// 时间

void main(){
    // 将当前片元坐标标准化到 [0, 1] 范围
    vec2 st=gl_FragCoord.xy/u_resolution.xy;
    
    // 确保长宽比保持一致
    st.x*=u_resolution.x/u_resolution.y;
    
    // 立方体的大小和位置
    float size=.5;// 立方体的半边长度
    vec3 cubePos=vec3(0.,0.,0.);// 立方体中心位置
    
    // 计算立方体每个面的颜色
    vec3 color=vec3(0.);
    vec3 faceColor[6];// 立方体六个面的颜色
    faceColor[0]=vec3(1.,0.,0.);// 前面红色
    faceColor[1]=vec3(0.,1.,0.);// 后面绿色
    faceColor[2]=vec3(0.,0.,1.);// 上面蓝色
    faceColor[3]=vec3(1.,1.,0.);// 下面黄色
    faceColor[4]=vec3(1.,0.,1.);// 左面紫色
    faceColor[5]=vec3(0.,1.,1.);// 右面青色
    
    // 根据片元位置计算立方体的可见面
    for(int i=0;i<6;i++){
        float dist=0.;
        if(i==0)dist=st.x+st.y-1.;// 正面
        if(i==1)dist=-st.x+st.y+1.;// 反面
        if(i==2)dist=st.y-.5;// 上面
        if(i==3)dist=-st.y+.5;// 下面
        if(i==4)dist=st.x-.5;// 左面
        if(i==5)dist=-st.x+.5;// 右面
        
        // 只要面向相机就显示
        if(dist<0.){
            color+=faceColor[i]*(.2+.8*(1.+dist));// 计算颜色
        }
    }
    
    // 输出最终颜色
    gl_FragColor=vec4(color,1.);
}