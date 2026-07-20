export const addToPanel = (item, loggedUser, userAvatar) => {
  let updatedItem = { ...item };

  if (item.members) {
    const alreadyMember = item.members.some(
      (member) => member.name === loggedUser
    );
    if (!alreadyMember) {
      updatedItem.members = [
        ...item.members,
        { name: loggedUser, avatar: userAvatar },
      ];
    }
  }

  if (!item.members && (item.players || item.viewers)) {
    if (!updatedItem.participants) {
      updatedItem.participants = [];
    }
    const alreadyParticipant = updatedItem.participants.some(
      (p) => p.name === loggedUser
    );
    if (!alreadyParticipant) {
      updatedItem.participants.push({ name: loggedUser, avatar: userAvatar });
    }
  }

  return updatedItem;
};