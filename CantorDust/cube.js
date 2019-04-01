// Creating the material for the cube
const material = new THREE.MeshLambertMaterial({
    color : 0xCC3427,
    wireframe : false,
    emissive : 0x111111
});

// A class for the cube
class Cube{
    constructor(posX, posY, posZ, side){
        this.side = side;
        this.x = posX;
        this.y = posY;
        this.z = posZ;
        
        // Creating a new cube
        const cube_geo = new THREE.CubeGeometry(this.side, this.side, this.side, this.side);
        cube_geo.translate(this.x, this.y, this.z);

        // Creating the cube
        const cube = new THREE.Mesh(cube_geo, material);
        this.cube = cube;
    }

    split(){
        let cubes = [];
        for(let i = -1; i < 2; ++i){
            for(let j = -1; j < 2; ++j){
                for(let k = -1; k < 2; ++k){
                    const new_side = this.side / 3;
                    if((i != 0 && j != 0 && k != 0)){ 
                    // || (i == 0 && j == 0 && k == 0)){
                        const new_cube = new Cube(this.x + new_side * i, this.y + new_side * j, this.z + new_side * k, new_side);
                        cubes.push(new_cube);
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