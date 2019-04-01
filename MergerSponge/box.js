class Box{
    constructor(x, y, z, a){
        this.x = x;
        this.y = y;
        this.z = z;
        this.a = a;

        // Creating the cube
        this.geometry = new THREE.BoxGeometry(this.a, this.a, this.a, this.a);
        this.geometry.translate(this.x, this.y, this.z);
        this.material = new THREE.MeshPhongMaterial(
            {
                specular: 0xD76531,
                color: 0xff0000,
                wireframe: false,
            }
        );
        this.cube = new THREE.Mesh(this.geometry, this.material);
    }

    rotate(){
        this.cube.rotation.x += 0;
        this.cube.rotation.y += 0.005;
        this.cube.rotation.z += 0;
    }

    split(){
        let cubes = [];
        for(let x = -1; x < 2; ++x){
            for(let y = -1; y < 2; ++y){
                for(let z = -1; z < 2; ++z){
                    let sum = Math.abs(x) + Math.abs(y) + Math.abs(z);
                    if(sum > 1){
                        let new_R = this.a / 3;
                        let cube = new Box(this.x + x * new_R, this.y + y * new_R, this.z + z * new_R, new_R);
                        cubes.push(cube);
                    }
                }
            }
        }
        return cubes;
    }   

    getCube(){
        return this.cube;
    }
}