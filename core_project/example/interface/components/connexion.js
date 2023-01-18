import { principal } from "../stores"
import { daoActor } from "../stores"
import { idlFactory as idlFactoryDAO } from "../../src/declarations/dao/dao.did.js"

//TODO : Add your mainnet id whenever you have deployed on the IC
const daoCanisterId =
  process.env.NODE_ENV === "development" ? "ryjl3-tyaaa-aaaaa-aaaba-cai" : "rvpd5-iqaaa-aaaaj-qazsa-cai"

// See https://docs.plugwallet.ooo/ for more informations
export async function plugConnection() {
  const result = await window.ic.plug.requestConnect({
    whitelist: [daoCanisterId],
  })
  if (!result) {
    throw new Error("User denied the connection")
  }
  const p = await window.ic.plug.agent.getPrincipal()
  const dao = await window.ic.plug.createActor({
    canisterId: daoCanisterId,
    interfaceFactory: idlFactoryDAO,
  })

  principal.update(() => p)
  daoActor.update(() => dao)
}
