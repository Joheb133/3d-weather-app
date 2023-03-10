uniform vec3 u_Color;

varying vec3 vertexNormal;

void main(){
    float intensity = pow(0.8 - dot(vertexNormal, vec3(0, 0, 1.0)), 2.0);
    gl_FragColor = vec4(u_Color, 1.0) * intensity;
}