uniform vec3 u_circleColor;
uniform vec3 u_backgroundColor;
uniform float u_circleRadius;
                      
varying vec2 vUv;
                      
void main() {
    float dist = length(vUv - vec2(0.5));
    float alpha = 1.0 - smoothstep(u_circleRadius - 0.2, u_circleRadius, dist);
    vec3 color = mix(u_backgroundColor, u_circleColor, alpha);
    gl_FragColor = vec4(color, alpha);
}