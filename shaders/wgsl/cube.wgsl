@binding(0) @group(0) var<uniform> frame : u32;

@vertex
fn vs_main(@builtin(vertex_index) vertex_index : u32) -> @builtin(position) vec4f {
    // 定义立方体的顶点位置
    const pos = array(
        vec3(-0.5, -0.5, -0.5),  // 顶点 0
        vec3( 0.5, -0.5, -0.5),  // 顶点 1
        vec3(-0.5,  0.5, -0.5),  // 顶点 2
        vec3( 0.5,  0.5, -0.5),  // 顶点 3
        vec3(-0.5, -0.5,  0.5),  // 顶点 4
        vec3( 0.5, -0.5,  0.5),  // 顶点 5
        vec3(-0.5,  0.5,  0.5),  // 顶点 6
        vec3( 0.5,  0.5,  0.5)   // 顶点 7
    );

    // 定义顶点的索引
    const indices = array<u32, 36>(
        0, 1, 2,  2, 1, 3,  // 面 1
        4, 5, 6,  6, 5, 7,  // 面 2
        0, 1, 4,  4, 1, 5,  // 面 3
        2, 3, 6,  6, 3, 7,  // 面 4
        0, 2, 4,  4, 2, 6,  // 面 5
        1, 3, 5,  5, 3, 7   // 面 6
    );

    return vec4f(pos[indices[vertex_index]], 1.0);
}

@fragment
fn fs_main() -> @location(0) vec4f {
    let green = sin(f32(frame) / 100.0);
    return vec4f(1.0, green, 0.0, 1.0);  // RGB 颜色
}