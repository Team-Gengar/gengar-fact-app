// INSERT new user into DB
INSERT INTO user_info (username, password, email, phone_number)
VALUES (<username>, <password>, <email>, <phone_number>);

// fix phone number for Twillio
function makeOnlyNums(str) {
  return str.replace(/[^0-9]/g, '');
}


// UPDATE user contact preference
UPDATE user_info
SET contact_preference
WHERE user_id = <user id>


// SELECT user, subsription, frequency, contact_preference
SELECT u.username, s.subscription_category, f.frequency, c.contact_preference
FROM public.user_info u
JOIN public.frequency f ON u.user_id = f.user_id
JOIN public.subscriptions s ON f.subscription_id = s.subscription_id;


// DELETE phone number


// UPDATE frequency of subscription
SET frequency = <new_frequency>
WHERE user_id = <user_id> AND subscription_id = <subscription_id>;



// DELETE subscription

DELETE FROM frequency
WHERE user_id = [user_id_value] AND subscription_id = [subscription_id_value];


