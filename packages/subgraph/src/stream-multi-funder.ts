import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  StreamMultiFunder,
  MultiFundStreams as MultiFundStreamsEvent,
} from "../generated/StreamMultiFunder/StreamMultiFunder"
import { MultiFundStreams, FundedStream } from "../generated/schema"


export function handleMultiFundStreams(event: MultiFundStreamsEvent): void {

  let fundedStream = FundedStream.load(
    getIdFromEventParams(event.params.sender, event.params.amounts)
  )

  if (!fundedStream) {
    fundedStream = new FundedStream(getIdFromEventParams(event.params.sender, event.params.amounts));
  }

  fundedStream.sender = event.params.sender;
  var streams = event.params.streams;
  var streamsString: string[] = [];
  for (let i = 0; i < streams.length; i++) {
    streamsString.push((streams[i]).toHexString());
  }

  fundedStream.streams = streamsString;

  fundedStream.amounts = event.params.amounts;

  // fundedStream.reasons = event.params.reasons;

  fundedStream.save();

}


function getIdFromEventParams(sender: Address, amounts: BigInt[]): string {
  // var randomNumber = Math.floor(Math.random() * 10000);
  // var randomNumberTwo = Math.floor(Math.random() * 10000);
  return amounts[0].toString() + sender.toHexString() + (amounts.length).toString() + amounts[amounts.length - 1].toString() 
}
