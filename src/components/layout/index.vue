<template>
    <div class="min-h-full">
        <Header />
        <Navbar />
        <main>
            <slot>
                <router-view /> 
            </slot>
        </main>
        <Footer />
    </div>
</template>

<script>
import Header from '../header/index.vue';
import Footer from '../footer/index.vue';
import Navbar from '../navbar/index.vue';

export default {
    components: {
        Header,
        Footer,
        Navbar
    }
}
</script>
