let autos=require('./autos');
let concesionaria = {
   autos: autos,
 
   buscarAuto: function(patente){
      let auto= this.autos.find(item=>item.patente===patente);
      if(auto===undefined) return null;
      return auto;
   },

   venderAuto:function(patente){
      let auto=this.buscarAuto(patente);
      if(auto!==null){
         auto.vendido=true;
         let otros=this.autos.filter(auto=>auto.patente!==patente);
         otros.push(auto);
         this.autos=otros;
      }
   },

   autosParaLaVenta:function(){
      let otros=this.autos.filter(auto=>auto.vendido===false);
      return otros;
   },
   
   autosNuevos: function(){
      let otros=this.autos.filter(auto=>auto.km<100);
      return otros;
   },
   listaDeVentas: function(){
    let otros=this.autos.filter(auto=>auto.vendido==true);
    let datos=[];
    for(let i=0;i<otros.length;i++){
       datos.push(otros[i].precio);
    }
    return datos;
    },
    totalDeVentas:function(){
        let ventas=this.listaDeVentas();
        let acum=0;
        let suma=ventas.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            acum
          );
        return suma
    },
    puedeComprar:function(auto,persona){
        let cuotas=auto.precio/auto.cuotas;
        let total=auto.precio;
        return persona.capacidadDePagoEnCuotas>=cuotas && persona.capacidadDePagoTotal>=total;

    },
    autosQuePuedeComprar: function(persona){
        let autosVenta=this.autosParaLaVenta();
        let puedeComprar=autosVenta.filter(auto=>this.puedeComprar(auto,persona));
        return puedeComprar;
    }

}
//concesionaria.venderAuto('APL123');
//JJK116
//concesionaria.venderAuto('JJK116');
console.log(concesionaria.autosQuePuedeComprar({
    nombre: "Juan",
    capacidadDePagoEnCuotas: 7200,
    capacidadDePagoTotal: 100000000
}));