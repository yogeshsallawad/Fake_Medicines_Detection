// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract MedicineRegistry {
    address public owner; // The owner of the registry

    struct MedicineDetails {
        string medicineName;
        string manufacturer;
        uint256 batchNumber;
        uint256 manufacturingDate;
        uint256 expiryDate;
    }

    mapping(bytes32 => MedicineDetails) medicineDetails;

    event MedicineAdded(bytes32 batchId, string medicineName, string manufacturer, uint256 manufacturingDate, uint256 expiryDate);

    event MedicineVerified(
        bytes32 batchId,
        string medicineName,
        string manufacturer,
        uint256 manufacturingDate,
        uint256 expiryDate
    );

    // Function to generate a unique batch ID
    function generateBatchId(string memory _medicineName, string memory _manufacturer, uint256 _batchNumber) private pure returns (bytes32) {
        return keccak256(abi.encodePacked(_medicineName, _manufacturer, _batchNumber));
    }

    function addMedicine(
        string memory _medicineName,
        string memory _manufacturer,
        uint256 _batchNumber,
        uint256 _manufacturingDate,
        uint256 _expiryDate
    ) public {
        bytes32 batchId = generateBatchId(_medicineName, _manufacturer, _batchNumber);
        require(
            medicineDetails[batchId].expiryDate == 0,
            "Medicine batch already exists"
        );

        medicineDetails[batchId] = MedicineDetails(
            _medicineName,
            _manufacturer,
            _batchNumber,
            _manufacturingDate,
            _expiryDate
        );

        emit MedicineAdded (batchId, _medicineName, _manufacturer, _manufacturingDate, _expiryDate);
    }

    function verifyMedicine(bytes32 _batchId)
        public
        view
        returns (
            string memory,
            string memory,
            uint256,
            uint256
        )
    {
        MedicineDetails storage data = medicineDetails[_batchId];
        require(data.expiryDate != 0, "Medicine batch not found");

        return (
            data.medicineName,
            data.manufacturer,
            data.manufacturingDate,
            data.expiryDate
        );
    }
}
