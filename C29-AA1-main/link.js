class link
{
constructor(bodyA,bodyB){

var ultimolink=bodyA.body.bodies.length-2;
this.link=Constraint.create({
bodyA:bodyA.body.bodies[ultimolink],
pointA:{x:0,y:0},
bodyB:bodyB,
pointB:{x:0,y:0},
length:-10,
stiffness:0.01
})
World.add(engine.world,this.link);

}

desconectar(){
World.remove(engine.world,this.link)

}








































}