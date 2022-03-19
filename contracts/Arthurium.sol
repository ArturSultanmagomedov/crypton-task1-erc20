//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Arthurium {
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    address private _minter;

    string private _name = "Arthurium";
    string private _symbol = "ATM";
    uint8 private _decimals = 18;
    uint256 private _totalSupply = 10000000;

    constructor() {
        _minter = msg.sender;
        _balances[msg.sender] = _totalSupply;
    }

    ////// PUBLIC VIEW //////

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function decimals() public view returns (uint8) {
        return _decimals;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return _balances[_owner];
    }

    ////// PUBLIC //////

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(msg.sender != address(0), "sender zero adress");
        require(_to != address(0), "receiver zero adress");

        uint256 fromBalance = _balances[msg.sender];
        require(fromBalance >= _value, "insufficient balance");

        unchecked {
            _balances[msg.sender] = fromBalance - _value;
        }

        _balances[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_from != address(0), "sender zero adress");
        require(_to != address(0), "receiver zero adress");
        require(msg.sender != address(0), "sender zero address");

        uint256 allow = allowance(_from, msg.sender);
        if (allow != type(uint256).max) {
            require(allow >= _value, "insufficient allowance");
            unchecked {
                _allowances[_from][msg.sender] = allow - _value;
                emit Approval(_from, msg.sender, allow - _value);
            }
        }

        uint256 fromBalance = _balances[_from];
        require(fromBalance >= _value, "insufficient balance");

        unchecked {
            _balances[_from] = fromBalance - _value;
        }

        _balances[_to] += _value;

        emit Transfer(_from, _to, _value);

        return true;
    }

    function approve(address spender, uint256 amount) public returns (bool) {
        address owner = msg.sender;

        require(owner != address(0), "approve from the zero address");
        require(spender != address(0), "approve to the zero address");

        _allowances[owner][spender] = amount;

        emit Approval(owner, spender, amount);

        return true;
    }

    function allowance(address owner, address spender) public returns (uint256) {
        return _allowances[owner][spender];
    }

    ////// EVENT //////

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    ////// ADDITIONAL //////

    function burn(address account, uint256 amount) public {
        require(account != address(0), "burn from the zero address");
        require(msg.sender == _minter, 'not an owner');

        require(_balances[account] >= amount, "burn amount exceeds balance");
        unchecked {
            _balances[account] -= amount;
        }
        _totalSupply -= amount;

        emit Transfer(account, address(0), amount);
    }

    function mint(address account, uint256 amount) public {
        require(account != address(0), "mint to the zero address");
        require(msg.sender == _minter, 'not an owner');

        _totalSupply += amount;
        _balances[account] += amount;

        emit Transfer(address(0), account, amount);
    }
}
