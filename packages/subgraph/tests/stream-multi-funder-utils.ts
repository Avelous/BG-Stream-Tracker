import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { MultiFundStreams } from "../generated/StreamMultiFunder/StreamMultiFunder"

export function createMultiFundStreamsEvent(
  sender: Address,
  streams: Array<Address>,
  amounts: Array<BigInt>,
  reasons: Array<string>
): MultiFundStreams {
  let multiFundStreamsEvent = changetype<MultiFundStreams>(newMockEvent())

  multiFundStreamsEvent.parameters = new Array()

  multiFundStreamsEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  multiFundStreamsEvent.parameters.push(
    new ethereum.EventParam("streams", ethereum.Value.fromAddressArray(streams))
  )
  multiFundStreamsEvent.parameters.push(
    new ethereum.EventParam(
      "amounts",
      ethereum.Value.fromUnsignedBigIntArray(amounts)
    )
  )
  multiFundStreamsEvent.parameters.push(
    new ethereum.EventParam("reasons", ethereum.Value.fromStringArray(reasons))
  )

  return multiFundStreamsEvent
}
