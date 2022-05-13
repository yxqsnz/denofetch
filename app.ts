import * as os from './os.ts'
import { Colors } from './deps.ts'
const user = os.getUserName()
const hostname = await os.getHostName()
const osName = await os.getOsName() ?? "Unknown"
const memUsage = await os.getSystemMemoryUsage()
const createItem = (name: string, value: string) => `${Colors.green(name)}: ${value}`

console.log(`     
       /\\     ${Colors.brightMagenta(`${user}@${hostname}`)}
      /  \\    ${createItem("os", osName)}
     /\    \\   ${createItem("deno", Deno.version.deno)}    
    /      \\  ${createItem("mem", `${memUsage.used}M of ${memUsage.total}M`)}  
   /   ,,   \\     
  /   |  |  -\\    
 /_-''    ''-_\\   
`)