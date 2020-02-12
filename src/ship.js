const shipFactory = (length) => {

  let body = {};
	let direction = "horizontal";

  for (let i = 1; i <= length; i++) {
    body[i] = {status: true, bodyIndex: i, shipLength: length};
  }

  const hit = (index) => {
    body[index].status = false;
  };

  const isSunk = () => {
    for (let i = 1; i <= length; i++) {
      if (body[i].status) {
        return false;
      }
    }
    return true;
  };

  const setDirection = (newDirection) => {
    direction = newDirection;
  };



  return { body, hit, isSunk, get direction() { return direction},
           setDirection };
}

export { shipFactory };