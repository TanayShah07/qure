import sys
import random
import json
import time
from math import gcd

def is_prime(n, k=5):
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0:
        return False

    # Miller-Rabin primality test
    r, s = 0, n - 1
    while s % 2 == 0:
        r += 1
        s //= 2

    for _ in range(k):
        a = random.randrange(2, n - 1)
        x = pow(a, s, n)
        if x == 1 or x == n - 1:
            continue
        for __ in range(r - 1):
            x = pow(x, 2, n)
            if x == n - 1:
                break
        else:
            return False
    return True

def generate_large_prime(bits=16):
    while True:
        num = random.getrandbits(bits)
        if is_prime(num):
            return num

def extended_gcd(a, b):
    if a == 0:
        return b, 0, 1
    gcd_val, x1, y1 = extended_gcd(b % a, a)
    x = y1 - (b // a) * x1
    y = x1
    return gcd_val, x, y

def mod_inverse(e, phi):
    _, x, _ = extended_gcd(e, phi)
    return x % phi

def generate_keys():
    p = generate_large_prime(16)
    q = generate_large_prime(16)

    while q == p:
        q = generate_large_prime(16)

    n = p * q
    phi = (p - 1) * (q - 1)

    e = 65537
    if gcd(e, phi) != 1:
        e = 3
        while gcd(e, phi) != 1:
            e += 2

    d = mod_inverse(e, phi)

    return {
        "public": (e, n),
        "private": (d, n)
    }

def encrypt(message, public_key):
    e, n = public_key
    start = time.time()
    cipher = [pow(ord(char), e, n) for char in message]
    end = time.time()
    return cipher, (end - start)

def decrypt(ciphertext, private_key):
    d, n = private_key
    start = time.time()
    plain = ''.join([chr(pow(char, d, n)) for char in ciphertext])
    end = time.time()
    return plain, (end - start)

if __name__ == "__main__":
    action = sys.argv[1]

    if action == "keygen":
        keys = generate_keys()
        print(json.dumps(keys))

    elif action == "encrypt":
        public_key = tuple(map(int, sys.argv[2].split(",")))
        message = sys.argv[3]
        cipher, enc_time = encrypt(message, public_key)
        print(json.dumps({
            "ciphertext": cipher,
            "time": enc_time
        }))

    elif action == "decrypt":
        private_key = tuple(map(int, sys.argv[2].split(",")))
        ciphertext = json.loads(sys.argv[3])
        plain, dec_time = decrypt(ciphertext, private_key)
        print(json.dumps({
            "plaintext": plain,
            "time": dec_time
        }))