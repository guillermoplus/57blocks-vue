import {describe, it, expect, vi} from 'vitest'

import {shallowMount} from '@vue/test-utils';
import LoginView from '@/views/Authentication/LoginView.vue';

describe('LoginView', () => {
    it('renders properly', () => {
        const wrapper = shallowMount(LoginView);
        expect(wrapper.exists()).toBeTruthy();
        // expect(wrapper.text()).toContain('Hello Vitest');
    });

    it('contains login form', () => {
        const wrapper = shallowMount(LoginView);
        const form = wrapper.find('form');
        expect(form.exists()).toBeTruthy();
    });

    it('submit the form on login button is clicked', async () => {
        const wrapper = shallowMount(LoginView);
        const spySubmit = vi.spyOn(wrapper.vm, 'submit');

        await wrapper.find('input[type="email"]').setValue('username123');
        await wrapper.find('input[type="password"]').setValue('password123');
        await wrapper.find('form').trigger('submit');
        expect(spySubmit).toHaveBeenCalled();
    });

    it('shows an alert when the email or password is empty', async () => {
        const wrapper = shallowMount(LoginView);
        const alertSpy = vi.spyOn(window, 'alert');

        await wrapper.find('form').trigger('submit');

        expect(alertSpy).toHaveBeenCalledWith('You must enter a valid email and password to login!');
    });

})
