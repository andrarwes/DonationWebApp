const stripe = Stripe('pk_test_51IiRfHJ4zzJBH3xkWri1Q4NWQQ0iPqZA2MW2bo1roaIndajBRtGCuK6mcTx6atehfB98DnQjA4Vi5ShQ9N0avElt00MGvDW2nn');
const elements = stripe.elements();

 var style= {
    base: {
      iconColor: '#c4f0ff',
      color: '#000000',
      fontWeight: 400,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '15px',
      fontSmoothing: 'antialiased',

      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#87BBFD',
      },
    },
    invalid: {
      iconColor: '#FF0000',
      color: '##FF0000',
    },
  } 

const cardNumber = elements.create('cardNumber', { style });
cardNumber.mount('#card-number');
const cardExpiry = elements.create('cardExpiry', { style });
cardExpiry.mount('#card-expiry');
const cardCvc = elements.create('cardCvc', { style });
cardCvc.mount('#card-cvc');
const form = document.querySelector('form');
const errorEl = document.querySelector('#card-errors');

const stripeTokenHandler = token => {
    const hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);

    console.log(form)
    form.submit();
}

form.addEventListener('submit', e => {
    e.preventDefault();

    stripe.createToken(cardNumber, cardExpiry, cardCvc).then(res => {
        if (res.error) errorEl.textContent = res.error.message;
        else {
            console.log(res.token)
            stripeTokenHandler(res.token);
        }
    })
})

