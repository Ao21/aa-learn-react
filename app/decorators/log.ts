function log(target: Function, key: string, descriptor: any) {

  // save a reference to the original method
  // this way we keep the values currently in the 
  // descriptor and don't overwrite what another 
  // decorator might have done to the descriptor.
  var originalMethod = descriptor.value; 

  //editing the descriptor/value parameter
  descriptor.value =  function (...args: any[]) {
      var a = args.map(a => JSON.stringify(a)).join();
      // note usage of originalMethod here
      var result = originalMethod.apply(this, args);
      var r = JSON.stringify(result);
      console.log(`Call: ${key}(${a}) => ${r}`);
      return result;
  }

  // return edited descriptor as opposed to overwriting 
  // the descriptor by returning a new descriptor
  return descriptor;
}