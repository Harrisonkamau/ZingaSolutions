(function(ndn, $) {
	"use strict";
	ndn.login = ndn.login || {};

	ndn.login.init_mfa = function() {
		$('.js-login-form').submit(function(e) {
			var $mfa_fieldset = $('.js-login-mfa');
			var $js_login_username = $('.js-login-username');
			var $js_mfa_input = $('.js-mfa-input');

			// If current username is not what we have saved
			// submit the form without MFA because we don't know if they need it
			if ($js_login_username.val() != $js_login_username.data('initial-username') ) {
				return 1;
			}

			// If we expect MFA and it's not visible, switch to it
			if ($mfa_fieldset.length && !$mfa_fieldset.is(':visible')) {
				e.preventDefault();
				$('.js-login-standard').hide();
				$mfa_fieldset.show();
				$js_mfa_input.prop('required', 1);

				// Firefox needs a delay for focus to work
				setTimeout(function () {
					$js_mfa_input.focus();
				}, 10);
			}
		});
	};


})(window.ndn = window.ndn || {}, jQuery);

$(function(){
	ndn.login.init_mfa();
});
