import bls from "@chainsafe/bls";

(async () => {
    // class-based interface
    const secretKey = bls.SecretKey.fromKeygen();
    console.log(secretKey.toHex());
    const publicKey = secretKey.toPublicKey();
    console.log(publicKey.toHex());
    const message = new Uint8Array(32);

    const signature = secretKey.sign(message);
    console.log("Is valid: ", signature.verify(publicKey, message));

    // functional interface
    const sk = secretKey.toBytes();
    const pk = bls.secretKeyToPublicKey(sk);
    const sig = bls.sign(sk, message);
    console.log("Is valid: ", bls.verify(pk, message, sig));
})();