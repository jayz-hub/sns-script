const crc = require('crc');
const bip39 = require("bip39");
const HDKey = require("hdkey");
const CryptoJS = require("crypto-js");
const Secp256k1 = require("secp256k1");
const { sha224 } = require('js-sha256')
const {Secp256k1KeyIdentity} = require("@dfinity/identity");
// import {array2hex } from '@choptop/haw';
const {Ed25519KeyIdentity} = require("@dfinity/identity");

const principalToSubAccount = (principal) => {
    const bytes = principal.toUint8Array();
    const subAccount = new Uint8Array(32);
    subAccount[0] = bytes.length;
    subAccount.set(bytes, 1);
    return subAccount;
};

const principalToAccountIdentifier = (
    principal,
    subAccount
) => {
const bytes = new Uint8Array(principalToAccount(principal, subAccount));
return toHexString(bytes);
};

  const toHexString = (bytes) => {
    return bytes.reduce(
      (str, byte) => str + byte.toString(16).padStart(2, '0'),''
    );
  };

const principalToAccount = (
    principal,
    subAccount
  ) => {
    // Hash (sha224) the principal, the subAccount and some padding
    const padding = asciiStringToByteArray('\x0Aaccount-id');
    const shaObj = sha224.create();
    shaObj.update(
      new Uint8Array([
        ...padding,
        ...principal.toUint8Array(),
        ...(subAccount ?? Array(32).fill(0))
      ])
    );
    const hash = new Uint8Array(shaObj.digest());
    // Prepend the checksum of the hash
    const checksum = calculateCrc32(hash);
    return [...checksum, ...hash];
};
const asciiStringToByteArray = (text) => {
    return Array.from(text).map((c) => c.charCodeAt(0));
};

const calculateCrc32 = (bytes) => {
    const checksumArrayBuf = new ArrayBuffer(4);
    const view = new DataView(checksumArrayBuf);
    view.setUint32(0, crc.crc32(Buffer.from(bytes)), false);
    return Buffer.from(checksumArrayBuf);
};

function getAccountCredentials(mnemonic, subAccount) {
  const keyPair = createSecp256K1KeyPair(mnemonic, subAccount || 0);
  return Secp256k1KeyIdentity.fromKeyPair(
      keyPair.publicKey,
      keyPair.privateKey
  );
}

const DERIVATION_PATH = "m/44'/223'/0'/0";

function createSecp256K1KeyPair(mnemonic, index) {
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  // console.log(Buffer.from(seed).toString("base64"));
  const masterKey = HDKey.fromMasterSeed(seed);
  const { privateKey } = masterKey.derive(`${DERIVATION_PATH}/${index}`);
  const publicKey = Secp256k1.publicKeyCreate(privateKey, false);
  return { privateKey, publicKey };
}

function createEd25519KeyPair(mnemonic, index) {
  var seed = bip39.mnemonicToSeedSync(mnemonic);
  seed = seed.slice(0,32)
  const keyPair = Ed25519.MakeKeypair(seed);
  console.log("keyPair:privateKey:",array2hex(keyPair.privateKey))
  return Ed25519KeyIdentity.fromKeyPair(keyPair.publicKey,keyPair.privateKey);
}

const hexToBytes = (hex) => {
  if (hex.substr(0, 2) === '0x') {
    hex = hex.replace(/^0x/i, '');
  }
  const bytes = [];
  for (let c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16));
  }
  return bytes;
};

function parseNeuronId (neuron_id) {
  let bytes = hexToBytes(neuron_id);
  return new Uint8Array([...bytes])
}

function getAccountId(principal, subAccount) {
  const sha = CryptoJS.algo.SHA224.create();
  sha.update(ACCOUNT_DOMAIN_SEPERATOR); // Internally parsed with UTF-8, like go does
  sha.update(byteArrayToWordArray(principal.toUint8Array()));
  const subBuffer = Buffer.from(SUB_ACCOUNT_ZERO);
  if (subAccount) {
    subBuffer.writeUInt32BE(subAccount);
  }
  sha.update(byteArrayToWordArray(subBuffer));
  const hash = sha.finalize();

  /// While this is backed by an array of length 28, it's canonical representation
  /// is a hex string of length 64. The first 8 characters are the CRC-32 encoded
  /// hash of the following 56 characters of hex. Both, upper and lower case
  /// characters are valid in the input string and can even be mixed.
  /// [ic/rs/rosetta-api/ledger_canister/src/account_identifier.rs]
  const byteArray = wordArrayToByteArray(hash, 28);
  const checksum = generateChecksum(byteArray);
  const val = checksum + hash.toString();

  return val;
}
function byteArrayToWordArray (byteArray)  {
  const wordArray = [];
  let i;
  for (i = 0; i < byteArray.length; i += 1) {
      wordArray[(i / 4) | 0] |= byteArray[i] << (24 - 8 * i);
  }
  // eslint-disable-next-line
  const result = CryptoJS.lib.WordArray.create(
      wordArray,
      byteArray.length
  );
  return result;
};
const crc32 = require('buffer-crc32');
function generateChecksum (hash) {
  const crc = crc32.unsigned(Buffer.from(hash));
  const hex = intToHex(crc);
  return hex.padStart(8, '0');
};
function intToHex (val) {
  return val < 0 ? (Number(val) >>> 0).toString(16) : Number(val).toString(16);
}

function ab2str (buf) {
  const decoder = new TextDecoder()
  return decoder.decode(Buffer.from(buf))
}
module.exports = {principalToAccountIdentifier,principalToSubAccount,getAccountCredentials,toHexString,parseNeuronId,getAccountId,createEd25519KeyPair,ab2str}