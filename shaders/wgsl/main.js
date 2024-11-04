async function initWebGPU() {
    const canvas = document.getElementById("webgpuCanvas");
    const context = canvas.getContext("webgpu");

    const adapter = await navigator.gpu.requestAdapter();
    const device = await adapter.requestDevice();

    const format = navigator.gpu.getPreferredCanvasFormat();
    context.configure({
        device: device,
        format: format,
        alphaMode: "opaque"
    });

    const shaderModule = device.createShaderModule({
        code: `
        @binding(0) @group(0) var<uniform> frame : u32;

        @vertex
        fn vtx_main(@builtin(vertex_index) vertex_index : u32) -> @builtin(position) vec4f {
            const pos = array(
                vec3(-0.5, -0.5, -0.5), vec3( 0.5, -0.5, -0.5),
                vec3(-0.5,  0.5, -0.5), vec3( 0.5,  0.5, -0.5),
                vec3(-0.5, -0.5,  0.5), vec3( 0.5, -0.5,  0.5),
                vec3(-0.5,  0.5,  0.5), vec3( 0.5,  0.5,  0.5)
            );

            const indices = array<u32, 36>(
                0, 1, 2, 2, 1, 3, 4, 5, 6, 6, 5, 7,
                0, 1, 4, 4, 1, 5, 2, 3, 6, 6, 3, 7,
                0, 2, 4, 4, 2, 6, 1, 3, 5, 5, 3, 7
            );

            return vec4f(pos[indices[vertex_index]], 1.0);
        }

        @fragment
        fn frag_main() -> @location(0) vec4f {
            let green = sin(f32(frame) / 100.0);
            return vec4f(1.0, green, 0.0, 1.0);
        }
        `
    });

    const pipeline = device.createRenderPipeline({
        vertex: {
            module: shaderModule,
            entryPoint: "vtx_main"
        },
        fragment: {
            module: shaderModule,
            entryPoint: "frag_main",
            targets: [{ format }]
        },
        primitive: {
            topology: "triangle-list"
        }
    });

    // 创建 Uniform Buffer 并设置绑定
    const uniformBuffer = device.createBuffer({
        size: 4,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });

    const uniformBindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [{
            binding: 0,
            resource: { buffer: uniformBuffer }
        }]
    });

    let frame = 0;

    function updateFrame() {
        device.queue.writeBuffer(
            uniformBuffer,
            0,
            new Uint32Array([frame])
        );
        frame++;
    }

    function render() {
        updateFrame();

        const commandEncoder = device.createCommandEncoder();
        const textureView = context.getCurrentTexture().createView();

        const renderPassDescriptor = {
            colorAttachments: [{
                view: textureView,
                clearValue: { r: 0, g: 0, b: 0, a: 1 },
                loadOp: 'clear',
                storeOp: 'store'
            }]
        };

        const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
        passEncoder.setPipeline(pipeline);
        passEncoder.setBindGroup(0, uniformBindGroup);
        passEncoder.draw(36, 1, 0, 0);  // 绘制36个顶点（立方体）
        passEncoder.end();

        device.queue.submit([commandEncoder.finish()]);

        requestAnimationFrame(render);
    }

    render();
}

initWebGPU();