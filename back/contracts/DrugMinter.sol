//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";

contract DrugMinter is ERC721URIStorage {
    enum RoleEnum {
        Admin,
        Manufacturer,
        RegulatoryAgency,
        Distributer,
        Wholesaler
    }

    enum DrugStatus {
        Created,
        ApprovalRequested,
        Approved,
        Declined
    }

    enum SupplyChainStatus {
        PendingManufacturing,
        Manufactured,
        InTransitToDistributer,
        AtDistributerFacility,
        InTransitToWholesaler,
        DeliveredToWholesaler,
        AtWholesalerFacility,
        ReadyForSale,
        Sold,
        Returned
    }

    struct Role {
        RoleEnum role;
        bool active;
    }

    struct Drug {
        uint256 tokenId;
        string name;
        DrugStatus status;
        SupplyChainStatus supplyChainStatus;
        string[] activeIngredients;
        string dosageForm;
        string route;
        string strength;
        address owner;
    }

    address owner;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string public collectionName;

    mapping(address => bool) public adminUsers;
    mapping(address => bool) public manufacturers;
    mapping(address => bool) public distributers;
    mapping(address => bool) public wholesalers;
    mapping(address => bool) public regulatoryAgencies;
    mapping(address => uint256) private drugOwnedAmount;
    mapping(uint256 => mapping(address => bool)) private drugOwners;
    mapping(uint256 => Drug) private drugs;

    constructor() ERC721("DrugSupplyChain", "DSCA") {
        collectionName = name();
        owner = msg.sender;
        adminUsers[msg.sender] = true;
        manufacturers[msg.sender] = true;
        regulatoryAgencies[msg.sender] = true;
        distributers[msg.sender] = true;
    }

    event RegisteredManufacturer(
        address registrant,
        address newManufacturer,
        uint256 time
    );
    event RegisteredRegulatoryAgency(
        address registrant,
        address newRegulatoryAgency,
        uint256 time
    );
    event RegisteredDistributer(
        address registrant,
        address newDistributer,
        uint256 time
    );
    event RegisteredWholesaler(
        address registrant,
        address newWholesaler,
        uint256 time
    );
    event ApprovedUser(address approver, address newApprovedUser, uint256 time);

    event DrugCreated(
        uint256 indexed tokenId,
        address creator,
        address recipient,
        DrugStatus status,
        uint256 time
    );
    event DrugApproved(uint256 indexed tokenId, address owner, uint256 time);
    event DrugDeclined(uint256 indexed tokenId, address owner, uint256 time);
    event DrugApprovalRequested(
        uint256 indexed tokenId,
        address sender,
        uint256 time
    );
    event DrugManufactured(
        uint256 indexed tokenId,
        address manufacturer,
        uint256 time
    );
    event DrugInTransitToDistributer(
        uint256 indexed tokenId,
        address manufacturer,
        address distributer,
        uint256 time
    );
    event DrugInDistributerFacility(
        uint256 indexed tokenId,
        address distributer,
        uint256 time
    );
    event DrugInTransitToWholesaler(
        uint256 indexed tokenId,
        address distributer,
        uint256 time
    );
    event DrugDeliveredToWholesaler(
        uint256 indexed tokenId,
        address distributer,
        uint256 time
    );
    event DrugInWholesalerFacility(
        uint256 indexed tokenId,
        address wholesaler,
        uint256 time
    );
    event DrugReadyForSale(
        uint256 indexed tokenId,
        address wholesaler,
        uint256 time
    );
    event DrugSold(uint256 indexed tokenId, address wholesaler, uint256 time);

    error InvalidDrugStatus();
    error InvalidSupplyChainStatus();

    modifier isApprovedUser() {
        require(
            adminUsers[msg.sender],
            "This function can only be called by an Approved user for this contract."
        );
        _;
    }

    modifier isRegulatoryAgency() {
        require(
            regulatoryAgencies[msg.sender],
            "This function can only be called by a registered Regulatory Agency."
        );
        _;
    }

    modifier isManufacturer() {
        require(
            manufacturers[msg.sender],
            "This function can only be called by a registered Manufacturer."
        );
        _;
    }

    modifier isDistributer() {
        require(
            distributers[msg.sender],
            "This function can only be called by a registered Distributer."
        );
        _;
    }

    modifier isWholesaler() {
        require(
            wholesalers[msg.sender],
            "This function can only be called by a registered Wholesaler."
        );
        _;
    }

    modifier isApprovedHandler(uint256 tokenId) {
        require(
            super._isApprovedOrOwner(msg.sender, tokenId),
            "This function can only be called by an Approved user for this token"
        );
        _;
    }

    modifier drugExists(uint256 tokenId) {
        require(
            tokenId > 0 && tokenId <= _tokenIds.current(),
            "TokenId sent doesn't exist."
        );
        _;
    }

    modifier inDrugStatus(uint256 tokenId, DrugStatus status) {
        if (drugs[tokenId].status != status) {
            revert InvalidDrugStatus();
        }
        _;
    }

    modifier inSupplyChainStatus(uint256 tokenId, SupplyChainStatus status) {
        if (drugs[tokenId].supplyChainStatus != status) {
            revert InvalidSupplyChainStatus();
        }
        _;
    }

    function isAddressOwner(address account) public view returns (bool) {
        return owner == account;
    }

    function registerManufacturer(address newManufacturer)
        public
        isApprovedUser
    {
        manufacturers[newManufacturer] = true;
        emit RegisteredManufacturer(
            msg.sender,
            newManufacturer,
            block.timestamp
        );
    }

    function registerWholesaler(address newWholesaler) public isApprovedUser {
        wholesalers[newWholesaler] = true;
        emit RegisteredWholesaler(msg.sender, newWholesaler, block.timestamp);
    }

    function registerRegulatoryAgency(address newRegulatoryAgency)
        public
        isApprovedUser
    {
        regulatoryAgencies[newRegulatoryAgency] = true;
        emit RegisteredRegulatoryAgency(
            msg.sender,
            newRegulatoryAgency,
            block.timestamp
        );
    }

    function registerDistributer(address newDistributer) public isApprovedUser {
        distributers[newDistributer] = true;
        emit RegisteredDistributer(msg.sender, newDistributer, block.timestamp);
    }

    function approveUser(address userToApprove) public isApprovedUser {
        adminUsers[userToApprove] = true;
        emit ApprovedUser(msg.sender, userToApprove, block.timestamp);
    }

    function requestApproval(uint256 tokenId) public isManufacturer {
        drugs[tokenId].status = DrugStatus.ApprovalRequested;
        emit DrugApprovalRequested(tokenId, msg.sender, block.timestamp);
    }

    function changeDrugStatus(uint256 tokenId, bool approve)
        public
        drugExists(tokenId)
        inDrugStatus(tokenId, DrugStatus.ApprovalRequested)
        inSupplyChainStatus(tokenId, SupplyChainStatus.PendingManufacturing)
        isRegulatoryAgency
    {
        if (approve) {
            drugs[tokenId].status = DrugStatus.Approved;
            emit DrugApproved(tokenId, msg.sender, block.timestamp);
        } else {
            drugs[tokenId].status = DrugStatus.Declined;
            emit DrugDeclined(tokenId, msg.sender, block.timestamp);
        }
    }

    function markAsManufactured(uint256 tokenId)
        public
        drugExists(tokenId)
        inDrugStatus(tokenId, DrugStatus.Approved)
        inSupplyChainStatus(tokenId, SupplyChainStatus.PendingManufacturing)
        isManufacturer
    {
        drugs[tokenId].supplyChainStatus = SupplyChainStatus.Manufactured;
        emit DrugManufactured(tokenId, msg.sender, block.timestamp);
    }

    function markAsInTransitToDistributer(uint256 tokenId)
        public
        drugExists(tokenId)
        inDrugStatus(tokenId, DrugStatus.Approved)
        inSupplyChainStatus(tokenId, SupplyChainStatus.Manufactured)
        isDistributer
    {
        drugs[tokenId].supplyChainStatus = SupplyChainStatus
            .InTransitToDistributer;
        emit DrugInTransitToDistributer(
            tokenId,
            drugs[tokenId].owner,
            msg.sender,
            block.timestamp
        );
    }

    function markAsInDistributerFacility(uint256 tokenId)
        public
        drugExists(tokenId)
        inDrugStatus(tokenId, DrugStatus.Approved)
        inSupplyChainStatus(tokenId, SupplyChainStatus.InTransitToDistributer)
        isDistributer
    {
        drugs[tokenId].supplyChainStatus = SupplyChainStatus
            .AtDistributerFacility;
        emit DrugInDistributerFacility(tokenId, msg.sender, block.timestamp);
    }

    function markAsInTransitToWholesaler(uint256 tokenId)
        public
        drugExists(tokenId)
        inDrugStatus(tokenId, DrugStatus.Approved)
        inSupplyChainStatus(tokenId, SupplyChainStatus.AtDistributerFacility)
        isDistributer
    {
        drugs[tokenId].supplyChainStatus = SupplyChainStatus
            .InTransitToWholesaler;
        emit DrugInTransitToWholesaler(tokenId, msg.sender, block.timestamp);
    }

    function markAsDeliveredToWholesaler(uint256 tokenId)
        public
        drugExists(tokenId)
        inDrugStatus(tokenId, DrugStatus.Approved)
        inSupplyChainStatus(tokenId, SupplyChainStatus.InTransitToWholesaler)
        isDistributer
    {
        drugs[tokenId].supplyChainStatus = SupplyChainStatus
            .DeliveredToWholesaler;
        emit DrugDeliveredToWholesaler(tokenId, msg.sender, block.timestamp);
    }

    function markAsInWholesalerFacility(uint256 tokenId)
        public
        drugExists(tokenId)
        inDrugStatus(tokenId, DrugStatus.Approved)
        inSupplyChainStatus(tokenId, SupplyChainStatus.DeliveredToWholesaler)
        isWholesaler
    {
        drugs[tokenId].supplyChainStatus = SupplyChainStatus
            .AtWholesalerFacility;
        emit DrugInWholesalerFacility(tokenId, msg.sender, block.timestamp);
    }

    function markAsReadyForSale(uint256 tokenId)
        public
        drugExists(tokenId)
        inDrugStatus(tokenId, DrugStatus.Approved)
        inSupplyChainStatus(tokenId, SupplyChainStatus.AtWholesalerFacility)
        isWholesaler
    {
        drugs[tokenId].supplyChainStatus = SupplyChainStatus.ReadyForSale;
        emit DrugReadyForSale(tokenId, msg.sender, block.timestamp);
    }

    function markAsSold(uint256 tokenId)
        public
        drugExists(tokenId)
        inDrugStatus(tokenId, DrugStatus.Approved)
        inSupplyChainStatus(tokenId, SupplyChainStatus.ReadyForSale)
        isWholesaler
    {
        drugs[tokenId].supplyChainStatus = SupplyChainStatus.Sold;
        emit DrugSold(tokenId, msg.sender, block.timestamp);
    }

    function getRoles(address account) public view returns (Role[] memory) {
        Role[] memory roles = new Role[](5);
        roles[0] = Role(RoleEnum.Admin, false);
        roles[1] = Role(RoleEnum.Manufacturer, false);
        roles[2] = Role(RoleEnum.RegulatoryAgency, false);
        roles[3] = Role(RoleEnum.Distributer, false);
        roles[4] = Role(RoleEnum.Wholesaler, false);
        if (isAddressOwner(account)) {
            roles[0].active = true;
        }
        if (manufacturers[account]) {
            roles[1].active = true;
        }
        if (regulatoryAgencies[account]) {
            roles[2].active = true;
        }
        if (distributers[account]) {
            roles[3].active = true;
        }
        if (wholesalers[account]) {
            roles[4].active = true;
        }

        return roles;
    }

    function mintProduct(
        address recipient,
        string memory name,
        string[] memory activeIngredients,
        string memory dosageForm,
        string memory route,
        string memory strength,
        string memory tokenURI
    ) public isManufacturer returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        drugs[newTokenId] = Drug(
            newTokenId,
            name,
            DrugStatus.Created,
            SupplyChainStatus.PendingManufacturing,
            activeIngredients,
            dosageForm,
            route,
            strength,
            recipient
        );
        drugOwners[newTokenId][recipient] = true;
        drugOwnedAmount[recipient] = drugOwnedAmount[recipient] + 1;
        _transfer(recipient, address(this), newTokenId);

        emit DrugCreated(
            newTokenId,
            recipient,
            msg.sender,
            DrugStatus.Created,
            block.timestamp
        );

        return newTokenId;
    }

    function fetchDrugInformation(uint256 tokenId)
        public
        view
        drugExists(tokenId)
        returns (Drug memory)
    {
        return drugs[tokenId];
    }

    function fetchDrugs() public view returns (Drug[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 currentIndex = 0;

        Drug[] memory items = new Drug[](totalItemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (
                drugs[i + 1].owner == msg.sender ||
                manufacturers[msg.sender] ||
                distributers[msg.sender] ||
                wholesalers[msg.sender] ||
                regulatoryAgencies[msg.sender]
            ) {
                uint256 currentId = i + 1;
                Drug storage currentItem = drugs[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
