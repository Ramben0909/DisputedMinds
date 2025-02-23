// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract UserHashStorage {
    mapping(string => string) private userHashes;
    
    event HashStored(string indexed email, string userHash);
    
    function storeHash(string memory _email, string memory _userHash) public {
        userHashes[_email] = _userHash;
        emit HashStored(_email, _userHash);
    }
    
    function getHash(string memory _email) public view returns (string memory) {
        return userHashes[_email];
    }
}