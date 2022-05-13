export async function getOsName(): Promise<string|undefined> {
    const osRelease = await Deno.readFile("/etc/os-release")
    const data = new TextDecoder().decode(osRelease)
    const lines = data.split("\n")
    const osName = lines.find(line => line.startsWith("PRETTY_NAME="))?.split("=")
    const rawName = osName?.at(1)
    const name = rawName?.replace(/\"/g, "")
    return name
}
export async function getHostName(): Promise<string> {
    const hostnameFile = await Deno.readFile("/etc/hostname")
    const hostname = new TextDecoder().decode(hostnameFile)
    return hostname.trim()
}
interface MemUsage {
    used: number
    total: number
}
export async function getSystemMemoryUsage(): Promise<MemUsage> {
    const freeOutput = Deno.run({
        cmd: ["free", "-m"],
        stdout: "piped"
    })
    const output = new TextDecoder().decode(await freeOutput.output())
    const lines = output.split("\n")
    const memLine = lines.find(line => line.startsWith("Mem.:") || line.startsWith("Mem:"))
    const mem = memLine?.split(" ")
    const memValues = mem?.filter(num => num.length > 0)
    const used = Number(memValues?.at(2))
    const total = Number(memValues?.at(1))
    return { used, total }
    
}

export const getUserName = () => Deno.env.get("USER")